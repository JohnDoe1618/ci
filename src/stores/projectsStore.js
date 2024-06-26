import { defineStore } from "pinia";

export const useProjectsStore = defineStore('projectsStore', () => {



    return {

    }
})

// ПРИМЕР СУЩНОСТЕЙ ПРОЕКТОВ ОПЕРАЦИЙ И ВЗАИМОДЕЙСТВИЙ

/* 
    project: {
        id: number,
        name: string,
        host: string,
        port: number,
        password: string,
        handshakeHash: string,
        createdAt: string,
        updatedAt: string,
    }
    operations: {
        table.increments('id', { primaryKey: true }).notNullable().unique();
        table.integer('project_id').unsigned().references('projects.id').notNullable();
        table.string('method').nullable();
        table.string('endpoint').notNullable();
        table.jsonb('path_params').nullable();
        table.jsonb('query_params').nullable();
        table.string('title').notNullable();
        table.string('description').nullable();
        table.specificType('users', 'text[]').defaultTo('{*}').notNullable();
        table.enum('for_role', ['moderator', 'admin', '*']).defaultTo('*').notNullable();
        table.timestamp('created_at');
        table.timestamp('updated_at');
    }

    interactions: {
        table.increments('id', { primaryKey: true }).notNullable();
        table.integer('project_id').unsigned().references('projects.id');
        table.integer('operation_id').unsigned().references('operations.id');
        table.integer('user_id').unsigned().references('users.id');
        table.timestamp('created_at');
    }


 */