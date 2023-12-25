import { CategoriaResponse } from "#categoria/models/response/categoriaResponse.js";

class Pageable {

    constructor(req) {
        this.page = req.page;
        this.limit = req.size ? + req.size : 3;
        this.offset = req.page ? req.page * this.limit : 0;
    }

    getPagingData = (totalElements, content) => {
        const currentPage = this.page ? + this.page : 0;
        const totalPages = Math.ceil(totalElements / this.limit);
        return {totalElements, content, totalPages, currentPage};
    };

}

export { Pageable }