import { defineStore } from "pinia";

export const useResponseStore = defineStore('response', {
    state: () => ({
        data: null as any,
        status: null as number | null,
        error: null as any
    }),

    actions: {
        setSuccess(data: any, status: number) {
            this.data = data;
            this.status = status;
            this.error = null;
        },

        setError(error: any, status: number){
            this.data = null;
            this.status = status;
            this.error = error;
        },

        clear() {
            this.data = null;
            this.status = null;
            this.error = null;
        }
    }
});