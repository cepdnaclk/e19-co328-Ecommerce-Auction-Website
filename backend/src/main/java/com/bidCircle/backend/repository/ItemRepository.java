package com.bidCircle.backend.repository;

import com.bidCircle.backend.entity.Item;
import com.bidCircle.backend.model.ListingHeaderModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Blob;
import java.util.List;
import java.util.Map;

@Repository
public interface ItemRepository extends JpaRepository<Item,Long> {
    @Query(
            value = "select id,title from item",
            nativeQuery = true
    )
    List<Object[]> getAllListingsHeader();

    @Query(
            value = "select id,title from item where c_name=?1",
            nativeQuery = true
    )
    List<Object[]> getAllListingsHeaderByCategory(String id);
}
