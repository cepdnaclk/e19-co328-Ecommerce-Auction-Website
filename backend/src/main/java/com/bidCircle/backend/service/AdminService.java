package com.bidCircle.backend.service;


import com.bidCircle.backend.model.AddNewSeller;
import com.bidCircle.backend.model.CategoryModel;

public interface AdminService {
    void addCategory(CategoryModel categoryModel);

    void addNewSeller(AddNewSeller addNewSeller);
}
