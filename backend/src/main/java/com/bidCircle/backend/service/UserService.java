package com.bidCircle.backend.service;

import com.bidCircle.backend.entity.UserInfo;
import com.bidCircle.backend.entity.VerificationToken;
import com.bidCircle.backend.model.UserModel;
import org.springframework.data.crossstore.ChangeSetPersister;


import java.util.Optional;

public interface UserService {
    UserInfo registerUser(UserModel userModel);

    void saveVerificationTokenForUser(String token, UserInfo user);

    String validateVerificationToken(String token);

    VerificationToken generateNewVerificationToken(String oldToken);

    UserInfo findUserByEmail(String email);

    void createPasswordResetTokenForUser(UserInfo user, String token);

    String validatePasswordResetToken(String token);

    Optional<UserInfo> getUserByPasswordResetToken(String token);

    void changePassword(UserInfo user, String newPassword);

    boolean checkIfValidOldPassword(UserInfo user, String oldPassword);

    void registerAuctioneer(UserModel userModel);

    Optional<UserInfo> findUserByUserName(String userName);

    void registerBidder(UserModel userModel);
}