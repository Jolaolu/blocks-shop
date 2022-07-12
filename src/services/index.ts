enum StatusCodes {
  UNAUTHORIZED = 401,
  INTERNAL_SERVER_ERROR = 500,
}

interface IHttpServiceConfig {
  baseUrl: string
  contentType?: string
  baseHeaders?: Record<string, string>
}

interface IClientOpts<S> {
  headers?: Record<string, string>
  method: string
  payload?: S
}

const DEFAULT_CONTENT_TYPE = 'application/json'

class HttpService {
  private baseUrl: string
  private baseHeaders: Record<string, string>

  constructor(cfg: IHttpServiceConfig) {
    this.baseUrl = cfg.baseUrl
    this.baseHeaders = {
      'Content-Type': cfg.contentType || DEFAULT_CONTENT_TYPE,
      ...cfg.baseHeaders,
    }
  }

  private async _constructClient<T, S>(url: string, opts: IClientOpts<S>): Promise<T> {
    const headers = {
      ...this.baseHeaders,
      ...(opts.headers || {}),
    }
    let body = ''

    const contentType = headers['Content-Type'] as string
    if (opts.payload) {
      if (contentType === DEFAULT_CONTENT_TYPE) {
        body = JSON.stringify(opts.payload)
      } else {
        body = opts.payload as unknown as string
      }
    }

    const fetchOpts = {
      method: opts.method,
      headers,
      ...(opts.payload ? { body } : {}),
    } as RequestInit

    const response = await fetch(`${this.baseUrl}/${url}`, fetchOpts)

    if (response.status === StatusCodes.UNAUTHORIZED) {
      throw new Error('internal server error')
    }

    if (response.status === StatusCodes.INTERNAL_SERVER_ERROR) {
      throw new Error('internal server error')
    }

    const data = await response.json()

    if (response.ok) {
      return data as T
    }

    return Promise.reject(data)
  }

  async get<T = unknown, S = null>(url: string, opts: Omit<IClientOpts<S>, 'method' | 'payload'>): Promise<T> {
    return this._constructClient<T, S>(url, {
      ...opts,
      method: 'GET',
    })
  }

  async post<T = unknown, S = Record<string, any>>(url: string, opts: Omit<IClientOpts<S>, 'method'>): Promise<T> {
    return this._constructClient<T, S>(url, {
      ...opts,
      method: 'POST',
    })
  }

  async put<T = unknown, S = Record<string, any>>(url: string, opts: Omit<IClientOpts<S>, 'method'>): Promise<T> {
    return this._constructClient<T, S>(url, {
      ...opts,
      method: 'PUT',
    })
  }

  async patch<T = unknown, S = Record<string, any>>(url: string, opts: Omit<IClientOpts<S>, 'method'>): Promise<T> {
    return this._constructClient<T, S>(url, {
      ...opts,
      method: 'PATCH',
    })
  }

  async delete<T = unknown, S = Record<string, any>>(url: string, opts: Omit<IClientOpts<S>, 'method'>): Promise<T> {
    return this._constructClient<T, S>(url, {
      ...opts,
      method: 'DELETE',
    })
  }
}

export default HttpService