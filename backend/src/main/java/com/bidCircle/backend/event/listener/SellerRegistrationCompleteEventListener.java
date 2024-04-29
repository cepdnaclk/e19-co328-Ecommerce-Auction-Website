package com.bidCircle.backend.event.listener;

import com.bidCircle.backend.entity.UserInfo;
import com.bidCircle.backend.event.RegistrationCompleteEvent;
import com.bidCircle.backend.event.SellerRegistrationCompleteEvent;
import com.bidCircle.backend.service.MailService;
import com.bidCircle.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
public class SellerRegistrationCompleteEventListener implements
        ApplicationListener<SellerRegistrationCompleteEvent> {

    @Autowired
    private UserService userService;

    @Autowired
    private MailService mailService;

    @Override
    public void onApplicationEvent(SellerRegistrationCompleteEvent event) {
        //Create the Verification Token for the User with Link
        Optional<UserInfo> optionalUser = userService.findUserByUserName(event.getUser().getUserName());
        UserInfo user = optionalUser.orElseThrow(() -> new IllegalStateException("User not found"));

        String token = UUID.randomUUID().toString();
        userService.saveVerificationTokenForUser(token,user);
        //Send Mail to user
        String url =
                event.getApplicationUrl()
                        + "/verifyRegistration?token="
                        + token;

        mailService.sendVerifyEmailToSeller(event.getUser(), url);
    }



}
