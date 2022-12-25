package com.devsup.movieflix.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsup.movieflix.entities.Movie;
import com.devsup.movieflix.entities.Review;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long>{

	@Query("SELECT m FROM Movie m "
			+ "WHERE (COALESCE(:genreId) IS NULL OR m.genre.id = :genreId) "
			+ "ORDER BY m.title ASC")
	Page<Movie> findMovies(Long genreId, Pageable pageable);

	
	@Query("SELECT r FROM Review r "
			+ "INNER JOIN Movie m ON r.movie.id = m.id "
			+ "WHERE r.movie.id = :movieId")
	List<Review> findByMovieId(Long movieId);

	
}
