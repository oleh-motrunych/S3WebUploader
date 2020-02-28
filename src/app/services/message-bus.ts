import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class MessageBus {
  private map = new Map<string, any[]>()

  constructor() {}

  public send(key, data): void {
    const cbs = this.map.get(key)
    if (cbs !== undefined) {
      // eslint-disable-next-line no-console
      console.debug(`Publishing channel ${key} ${JSON.stringify(data)}`)
      cbs.forEach(it => it(key, data))
    }
  }

  public on(key: string, cb: any): void {
    // eslint-disable-next-line no-console
    console.debug(`Subscribing channel ${key}`)

    const cbs = this.map.get(key)
    if (cbs === undefined) {
      this.map.set(key, [cb])
    } else if (Array.isArray(cbs)) {
      this.map.set(key, [...cbs, cb])
    }
  }
}
