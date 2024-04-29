package com.bidCircle.backend.service;

import com.bidCircle.backend.entity.Item;
import com.bidCircle.backend.model.ItemModel;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.time.DateTimeException;
import java.util.Optional;

public interface SellerService {
    long addItem(ItemModel itemModel) throws DateTimeException;

    void saveItem(Item item);

    Optional<Item >getItemById(long id);

    Item findItemById(long id) throws ChangeSetPersister.NotFoundException;
}
