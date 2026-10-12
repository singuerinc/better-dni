declare module "nanobench" {
  interface Benchmark {
    start(): void;
    end(msg?: string): number;
    error(err: Error): void;
    log(msg: string): void;
    elapsed(): number;
  }

  type BenchmarkFn = (b: Benchmark) => void;

  interface Nanobench {
    (name: string, fn: BenchmarkFn): void;
    only(name: string, fn: BenchmarkFn): void;
    skip(name: string, fn: BenchmarkFn): void;
  }

  const nanobench: Nanobench;
  export default nanobench;
}
