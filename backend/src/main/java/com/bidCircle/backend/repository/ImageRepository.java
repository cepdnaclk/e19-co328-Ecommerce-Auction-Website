package com.bidCircle.backend.repository;

import com.bidCircle.backend.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Blob;

@Repository
public interface ImageRepository extends JpaRepository<Image,String> {

    @Query(
            value = "select * from image where item_id = ?1  limit 1",
            nativeQuery = true
    )
    Image getHeaderImage(long id);
}
