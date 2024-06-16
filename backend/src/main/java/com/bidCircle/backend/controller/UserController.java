package com.bidCircle.backend.controller;

import com.bidCircle.backend.entity.UserInfo;
import com.bidCircle.backend.model.BidModel;
import com.bidCircle.backend.model.UserModel;
import com.bidCircle.backend.service.BidderService;
import com.bidCircle.backend.service.UserService;
import com.bidCircle.backend.service.UserServiceImpl;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private BidderService bidderService;

    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/bid")
    public String placeBid(@RequestBody BidModel bidModel) {
            bidderService.addBid(bidModel);
            return "Success";


    }
    @PostMapping("/watclist")
    public String placeWatchList(@RequestBody BidModel bidModel) {
        bidderService.addWatchList(bidModel);
        return "Success";

    }

    @GetMapping("/profile")
    public ResponseEntity<UserModel> getUserProfile(HttpServletRequest request) {
        String userName = request.getHeader("userName");
        Optional<UserInfo> user = userService.findUserByUserName(userName);
        if (user.isPresent()) {
            UserModel userModel = new UserModel();
            userModel.setEmail(user.get().getEmail());
            userModel.setUserName(user.get().getUserName());
            userModel.setRoles(user.get().getRoles());
            return new ResponseEntity<>(userModel, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    

}
