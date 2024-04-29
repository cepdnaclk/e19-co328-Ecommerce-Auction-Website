package com.bidCircle.backend.service;

import com.bidCircle.backend.entity.UserInfo;
import com.bidCircle.backend.model.AddNewSeller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {
    @Autowired
    JavaMailSender javaMailSender;

    public String sendVerifyEmail(UserInfo user, String url) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("bidcircleauction@gmail.com");
        message.setTo(user.getEmail());
        String text = "Hi "+ user.getUserName()  +"\n\n"
                + "You’re almost ready to start enjoying BIDCIRCLE." +"\n"
                +"Verify your email address " + url+"\n\n"+
                "Thanks,"+"\n"
                +"BIDCIRCLE Team";
        message.setSubject("Verify your Email");
        message.setText(text);

        javaMailSender.send(message);

        return "Mail sent successfully";
    }

    public void sendVerifyEmailToSeller(AddNewSeller user, String url) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("bidcircleauction@gmail.com");
        message.setTo(user.getEmail());
        String text = "Hi "+ user.getCompanyName()  +"\n\n"
                + "Congratulations! You have been added as an Auctioneer in bid Circle." +"\n"
                +"Your user name"+user.getUserName()+"\n"
                +"Your Password"+user.getPassword()+"\n"+
                "you can change your username and password after logging"
                +"Verify your email address " + url+"\n\n"+
                "Thanks,"+"\n"
                +"BIDCIRCLE Team";
        message.setSubject("Verify your Email");
        message.setText(text);

        javaMailSender.send(message);
    }
}