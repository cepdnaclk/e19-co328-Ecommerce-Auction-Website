package com.bidCircle.backend.service;

import com.bidCircle.backend.model.BidModel;

public interface BidderService {
    void addBid(BidModel bidModel);

    void addWatchList(BidModel bidModel);
}
