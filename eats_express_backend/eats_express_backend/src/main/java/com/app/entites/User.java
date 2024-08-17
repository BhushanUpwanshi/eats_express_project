package com.app.entites;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userId;
	private String firstName;
	private String lastName;
	private String mobileNumber;
	private String email;
	private String password;

	private String city;
	private String state;
	private String country;

	@Enumerated(EnumType.STRING)
	private RoleEnum role;

//	@OneToOne(cascade = CascadeType.REMOVE,orphanRemoval = true)
//	@JoinColumn(name = "address_id")
//	private Address address;

	@JsonIgnore
	@OneToOne(mappedBy = "user", cascade = { CascadeType.REMOVE, CascadeType.PERSIST,
			CascadeType.MERGE }, orphanRemoval = true)
	private Cart cart;

	@JsonIgnore
	@ManyToMany
	@JoinTable(name = "favorite_product", joinColumns = @JoinColumn(name = "user_id"),
	inverseJoinColumns = @JoinColumn(name = "product_id"))
	private Set<Product> favoriteProduct;
	

}
