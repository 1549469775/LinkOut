class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  public greet() {
    return "Hello, " + this.greeting;
  }
  private think() {

  }

  protected sing() {

  }
}

let greeter = new Greeter("world");