package com.bidCircle.backend.model;

import lombok.Data;

import java.sql.Blob;

@Data
public class ListingAllModel {
    private Long id;
    private String title;
    private byte [] data;
}
