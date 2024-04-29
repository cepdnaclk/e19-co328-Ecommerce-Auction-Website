package com.bidCircle.backend.repository;

import com.bidCircle.backend.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserInfoRepository extends JpaRepository <UserInfo, String> {
    Optional<UserInfo> findByUserName(String userName);

    UserInfo findByEmail(String email);

    @Query(
            value = "select roles from user_info where user_name = ?1",
            nativeQuery = true
    )
    String getRolesByUserName(String username);
}