package com.bidCircle.backend.service;

import com.bidCircle.backend.entity.Image;
import com.bidCircle.backend.entity.Item;
import com.bidCircle.backend.model.ListingAllModel;
import com.bidCircle.backend.repository.ImageRepository;
import com.bidCircle.backend.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Blob;
import java.sql.SQLException;
import java.util.*;

@Service
public class ListingServiceImpl implements ListingService{

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Override
    public Optional<Item> getItemById(long id) {
        return itemRepository.findById(id);
    }

    @Override
    public List<ListingAllModel> getAll() throws SQLException {
            List<Object[]> mapList= itemRepository.getAllListingsHeader();
            List<ListingAllModel> listingAllModels = new ArrayList<>();
            for (Object[] map: mapList){
                ListingAllModel listingAllModel = new ListingAllModel();
                long key = Long.valueOf(map[0].toString());
                listingAllModel.setId(key);
                listingAllModel.setTitle(map[1].toString());
                Image im = imageRepository.getHeaderImage(key);
                listingAllModel.setData(im.getData().getBytes(1,(int) im.getData().length()));
                listingAllModels.add(listingAllModel);

            }
//         List<ListingAllModel> listingAllModels = new ArrayList<>();
//             for(Map.Entry<Long, String>header: listingHeaderModels.entrySet()) {
//                 ListingAllModel model = new ListingAllModel();
//                 model.setTitle(header.getKey());
//                 model.setId(header.getValue());
//                // Blob blob = itemRepository.getHeaderImage(Long.parseLong(header.getKey()));
//                 //model.setData(blob.getBytes(1, (int) blob.length()));
//                 listingAllModels.add(model);
//             }
//
//
//
         return listingAllModels;

    }

    @Override
    public List<ListingAllModel> getByCategory(String id) throws SQLException {
        List<Object[]> mapList= itemRepository.getAllListingsHeaderByCategory(id);
        List<ListingAllModel> listingAllModels = new ArrayList<>();
        for (Object[] map: mapList){
            ListingAllModel listingAllModel = new ListingAllModel();
            long key = Long.valueOf(map[0].toString());
            listingAllModel.setId(key);
            listingAllModel.setTitle(map[1].toString());
            Image im = imageRepository.getHeaderImage(key);
            listingAllModel.setData(im.getData().getBytes(1,(int) im.getData().length()));
            listingAllModels.add(listingAllModel);

        }
        return listingAllModels;
    }
}
