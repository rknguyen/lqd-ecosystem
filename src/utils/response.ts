class RKError {
  message : string;
  debug : object;
  constructor(message: string, debug = {}) {
    this.message = message
    this.debug = debug
  }
  toJSON() {
    return {
      error: true,
      message: this.message,
      debug: this.debug
    }
  }
}

class RKSuccess {
  message : string;
  data: object;
  constructor(message: string, data: object = {}) {
    this.message = message
    this.data = data
  }
  toJSON() {
    return {
      success: true,
      message: this.message,
      data: this.data
    }
  }
}

export { RKError, RKSuccess }