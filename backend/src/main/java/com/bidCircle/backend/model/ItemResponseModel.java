package com.bidCircle.backend.model;

import com.bidCircle.backend.entity.Image;
import lombok.Data;

import java.util.List;

@Data
public class ItemResponseModel {
    private String name;
    private String title;
    private String description;
    private String  startDate;
    private String endDate;
    private String startPrice;
    private String incrementPrice;
    private String Category;
    private List<byte[]> data;
}
