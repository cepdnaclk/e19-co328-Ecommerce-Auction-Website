package com.bidCircle.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TokenModel {
    private String accessToken;
    private String roles;
    private String userName;
    private String companyName;
}