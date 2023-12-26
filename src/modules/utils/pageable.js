import { CategoriaResponse } from "#categoria/models/response/categoriaResponse.js";
import { Op } from "sequelize";
import { query } from "express";

class Pageable {

    constructor(query) {
        this.page = query.page;
        this.limit = query.size ? + query.size : 3;
        this.offset = query.page ? query.page * this.limit : 0;
        this.filter = query.filter;
    }

     getPagingData (totalElements, content){
        const currentPage = this.page ? + this.page : 0;
        const totalPages = Math.ceil(totalElements / this.limit);
        return {totalElements, content, totalPages, currentPage};
    }


     getFilter(column) {
        return this.filter ? {[`${column}`]: {[Op.like]: `%${this.filter}%`}} : null;
    }

}

export { Pageable }