package com.bidCircle.backend.controller;

import com.bidCircle.backend.event.RegistrationCompleteEvent;
import com.bidCircle.backend.event.SellerRegistrationCompleteEvent;
import com.bidCircle.backend.model.AddNewSeller;
import com.bidCircle.backend.model.CategoryModel;
import com.bidCircle.backend.service.AdminService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @Autowired
    private ApplicationEventPublisher publisher;
    @PostMapping("/addCategory")
    public String addNewUser(@RequestBody CategoryModel categoryModel){

         adminService.addCategory(categoryModel);
         return "Success";
    }
    @PostMapping("/addSeller")
    public String addNewSeller(@RequestBody AddNewSeller addNewSeller, final HttpServletRequest request){

        adminService.addNewSeller(addNewSeller);


        publisher.publishEvent(new SellerRegistrationCompleteEvent(
                addNewSeller,
                applicationUrl(request)
        ));

        return "Success";
    }

    private String applicationUrl(HttpServletRequest request) {
        return "http://" +
                request.getServerName() +
                ":" +
                request.getServerPort() +
                request.getContextPath();
    }
}
