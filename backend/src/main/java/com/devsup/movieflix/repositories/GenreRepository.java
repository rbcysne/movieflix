package com.devsup.movieflix.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsup.movieflix.entities.Genre;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Long>{

	@Query("SELECT g FROM Genre g "
			+ "WHERE (COALESCE(:genreId) IS NULL OR g.id = : genreId) "
			+ "ORDER BY g.name ASC")
	Page<Genre> findGenres(Long genreId, Pageable pageable);

}
