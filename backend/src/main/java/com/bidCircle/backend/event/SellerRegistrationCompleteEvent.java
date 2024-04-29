package com.bidCircle.backend.event;

import com.bidCircle.backend.entity.Auctioneer;
import com.bidCircle.backend.model.AddNewSeller;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class SellerRegistrationCompleteEvent extends ApplicationEvent {
    private final AddNewSeller user;
    private final String applicationUrl;

    public SellerRegistrationCompleteEvent(AddNewSeller user, String applicationUrl) {
        super(user);
        this.user = user;
        this.applicationUrl = applicationUrl;
    }
}
