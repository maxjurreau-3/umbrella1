// portal-os/kernel/scheduler/core.ts
// Minimal Scheduler for Portal-OS kernel. Provides one-shot and recurring task scheduling.

export type ScheduledTask = {
  id: number;
  name?: string;
  cancel: () => void;
};

export class Scheduler {
  private nextId = 1;
  private timers = new Map<number, NodeJS.Timeout>();
  private running = true;

  scheduleOnce(fn: () => void, delayMs = 0, name?: string): ScheduledTask {
    const id = this.nextId++;
    if (!this.running) throw new Error("Scheduler is stopped");
    const timer = setTimeout(() => {
      try {
        fn();
      } finally {
        this.timers.delete(id);
      }
    }, delayMs);
    this.timers.set(id, timer);
    return { id, name, cancel: () => this.cancel(id) };
  }

  scheduleRecurring(fn: () => void, intervalMs: number, name?: string): ScheduledTask {
    const id = this.nextId++;
    if (!this.running) throw new Error("Scheduler is stopped");
    const timer = setInterval(() => {
      try {
        fn();
      } catch (e) {
        // swallow errors to keep scheduler running
        // in a real kernel we'd escalate or log
        // console.error("Scheduler task error", e);
      }
    }, intervalMs);
    this.timers.set(id, timer as unknown as NodeJS.Timeout);
    return { id, name, cancel: () => this.cancel(id) };
  }

  cancel(id: number) {
    const t = this.timers.get(id);
    if (!t) return false;
    clearTimeout(t);
    clearInterval(t as unknown as NodeJS.Timeout);
    this.timers.delete(id);
    return true;
  }

  stop() {
    this.running = false;
    for (const [id, t] of this.timers) {
      clearTimeout(t);
      clearInterval(t as unknown as NodeJS.Timeout);
    }
    this.timers.clear();
  }

  isRunning() {
    return this.running;
  }
}
