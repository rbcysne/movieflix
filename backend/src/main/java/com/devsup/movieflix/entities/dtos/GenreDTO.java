package com.devsup.movieflix.entities.dtos;

import java.io.Serializable;
import java.util.Objects;

import com.devsup.movieflix.entities.Genre;

public class GenreDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String name;
	
	public GenreDTO() {
		
	}

	public GenreDTO(Long id, String name) {
		this.id = id;
		this.name = name;
	}
	
	public GenreDTO(Genre genre) {
		id = genre.getId();
		name = genre.getName();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		GenreDTO other = (GenreDTO) obj;
		return Objects.equals(id, other.id) && Objects.equals(name, other.name);
	}

	
}
