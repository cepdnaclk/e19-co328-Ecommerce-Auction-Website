package com.bidCircle.backend.model;

import lombok.Data;

@Data
public class AddNewSeller {
    private String userName;
    private String password;
    private String email;
    private String companyName;
}
