package com.bidCircle.backend.event;


import com.bidCircle.backend.entity.UserInfo;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class RegistrationCompleteEvent extends ApplicationEvent {

    private final UserInfo user;
    private final String applicationUrl;

    public RegistrationCompleteEvent(UserInfo user, String applicationUrl) {
        super(user);
        this.user = user;
        this.applicationUrl = applicationUrl;
    }
}