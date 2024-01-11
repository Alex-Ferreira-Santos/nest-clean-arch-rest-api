import { Column, Entity, PrimaryColumn } from 'typeorm';
import crypto from 'crypto';

export enum ProjectStatus {
  Pending = 'pending',
  Active = 'active',
  Cancelled = 'cancelled',
  Completed = 'completed',
}

@Entity()
export class Project {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true, type: 'datetime' })
  started_at: Date | null;

  @Column({ nullable: true, type: 'datetime' })
  cancelled_at: Date | null;

  @Column({ nullable: true, type: 'datetime' })
  finished_at: Date | null;

  @Column({ type: 'simple-enum' })
  status: ProjectStatus = ProjectStatus.Pending;

  constructor(
    props: {
      name: string;
      description: string;
      started_at: Date | null;
      cancelled_at: Date | null;
      finished_at: Date | null;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();

    if (props?.started_at) {
      this.start(props.started_at);
    }
  }

  start(started_at: Date) {
    const blockedStatus = [
      ProjectStatus.Active,
      ProjectStatus.Completed,
      ProjectStatus.Cancelled,
    ];

    console.log(this.status);
    if (blockedStatus.includes(this.status)) {
      return {
        status: 'fail',
        message: 'Cannot start project with the current status',
      };
    }

    this.started_at = started_at;
    this.status = ProjectStatus.Active;
  }

  cancel(cancelled_at: Date) {
    const blockedStatus = [ProjectStatus.Completed, ProjectStatus.Cancelled];

    if (blockedStatus.includes(this.status)) {
      return {
        status: 'fail',
        message: 'Cannot cancel project with the current status',
      };
    }

    if (cancelled_at < this.started_at) {
      return {
        status: 'fail',
        message: 'Cannot cancel project before it started',
      };
    }

    this.cancelled_at = cancelled_at;
    this.status = ProjectStatus.Cancelled;
  }

  finish(finished_at: Date) {
    const blockedStatus = [ProjectStatus.Completed, ProjectStatus.Cancelled];

    if (blockedStatus.includes(this.status)) {
      return {
        status: 'fail',
        message: 'Cannot finish project with the current status',
      };
    }

    if (finished_at < this.started_at) {
      return {
        status: 'fail',
        message: 'Cannot cancel project before it started',
      };
    }

    this.finished_at = finished_at;
    this.status = ProjectStatus.Completed;
  }
}
