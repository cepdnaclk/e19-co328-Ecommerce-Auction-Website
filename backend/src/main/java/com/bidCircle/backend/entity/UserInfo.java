package com.bidCircle.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
//@Table(uniqueConstraints = {@UniqueConstraint(name = "UniqueEmail", columnNames = {"email"})})
public class UserInfo {

    @Id
    private String userName;
    private String password;
    private String roles;
    private boolean enabled = false;
//    @Column(unique = true)
    private String email;

}