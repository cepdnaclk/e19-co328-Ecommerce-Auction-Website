package com.bidCircle.backend.controller;

import com.bidCircle.backend.model.BidModel;
import com.bidCircle.backend.model.UserModel;
import com.bidCircle.backend.service.BidderService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private BidderService bidderService;

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


}
