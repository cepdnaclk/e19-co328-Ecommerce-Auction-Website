package com.bidCircle.backend.service;

import com.bidCircle.backend.entity.Auctioneer;
import com.bidCircle.backend.entity.Category;
import com.bidCircle.backend.entity.UserInfo;
import com.bidCircle.backend.model.AddNewSeller;
import com.bidCircle.backend.model.CategoryModel;
import com.bidCircle.backend.repository.AuctioneerRepository;
import com.bidCircle.backend.repository.CategoryRepository;
import com.bidCircle.backend.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AuctioneerRepository auctioneerRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void addCategory(CategoryModel categoryModel) {
        Category category = new Category();
        category.setName(categoryModel.getName());
        categoryRepository.save(category);

    }

    @Override
    public void addNewSeller(AddNewSeller addNewSeller) {
        UserInfo selller = new UserInfo();
        selller.setRoles("ROLE_SELLER");
        selller.setUserName(addNewSeller.getUserName());
        selller.setPassword(passwordEncoder.encode(addNewSeller.getPassword()));
        selller.setEmail(addNewSeller.getEmail());
        userInfoRepository.save(selller);

        Auctioneer auctioneer = new Auctioneer();
        auctioneer.setUserName(addNewSeller.getUserName());
        auctioneer.setCompanyName(addNewSeller.getCompanyName());

        auctioneerRepository.save(auctioneer);

    }
}
