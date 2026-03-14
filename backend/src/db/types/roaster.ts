import type { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';

export type RoastersTable = {
	roaster_id: Generated<number>;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined>;
	deleted_at: ColumnType<Date, string | undefined>;
	name: ColumnType<string>;
};

export type Roaster = Selectable<RoastersTable>;
export type CreateRoaster = Insertable<RoastersTable>;
export type UpdateRoaster = Updateable<RoastersTable>;
