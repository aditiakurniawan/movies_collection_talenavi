import axios from "axios";

const baseURL = "https://technical.test.talenavi.com/api";

class MovieService {
    getMovies() {
        return axios.get(`${baseURL}/movie`);
    }

    getMovie(id) {
        return axios.get(`${baseURL}/movie/${id}`);
    }

    addMovie(movie) {
        return axios.post(`${baseURL}/movie`, movie);
    }

    updateMovie(id, movie) {
        return axios.put(`${baseURL}/movie/${id}`, movie);
    }

    deleteMovie(id) {
        return axios.delete(`${baseURL}/movie/${id}`);
    }

    getGenres() {
        return axios.get(`${baseURL}/genre`);
    }

    findByTitle(title) {
        return axios.get(`${baseURL}/movie?search=${title}`);
    }
}

export default new MovieService();