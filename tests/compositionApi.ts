import { App, createApp, provide } from '@vue/composition-api'

// https://vuejs.org/guide/scaling-up/testing.html#recipes
export function withSetup<T>(
  composable: () => T,
  props: { provide?: Record<string, any> } = {}
): readonly [T, App<any>] {
  let result: T
  const app = createApp({
    setup() {
      if (props.provide) {
        for (const [key, value] of Object.entries(props.provide)) {
          provide(key, value)
        }
      }

      result = composable()
      // suppress missing template warning
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {}
    },
  })
  app.mount(document.createElement('div'))
  // return the result and the app instance
  // for testing provide / unmount
  return [result!, app]
}
