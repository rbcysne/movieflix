package com.devsup.movieflix.services;

import java.io.Serializable;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsup.movieflix.entities.Genre;
import com.devsup.movieflix.entities.dtos.GenreDTO;
import com.devsup.movieflix.exceptions.RegisterNotFoundException;
import com.devsup.movieflix.repositories.GenreRepository;

@Service
public class GenreService implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Autowired
	GenreRepository genreRepository;
	
	@Autowired
	MessageSource messageSource;
	
	@Transactional(readOnly = true)
	public Page<GenreDTO> findGenres(Long genreId, Pageable pageable) {
		
		Page<Genre> page;
		
		Long id = (genreId == 0) ? null : genreId;
		
		try {
			page = genreRepository.findGenres(id, pageable);
		} catch(Exception e) {
			throw new RuntimeException(e.getMessage());
		}
		
		return page.map(x -> new GenreDTO(x));
	}

	@Transactional(readOnly = true)
	public GenreDTO findById(Long id) {
		
		Genre genre = new Genre();
		
		Optional<Genre> obj = genreRepository.findById(id);
		
		genre = obj.orElseThrow(() -> new RegisterNotFoundException(this.messageSource.getMessage("genre-not-found-with-id", null, null) + " - " + id));
		
		return new GenreDTO(genre);
	}

}
