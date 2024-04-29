package com.bidCircle.backend.service;

import com.bidCircle.backend.entity.Item;
import com.bidCircle.backend.model.ListingAllModel;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface ListingService {
    Optional<Item> getItemById(long id);

    List<ListingAllModel> getAll() throws SQLException;

    List<ListingAllModel> getByCategory(String id) throws SQLException;
}
