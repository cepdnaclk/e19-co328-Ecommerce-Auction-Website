package com.bidCircle.backend.service;

import com.bidCircle.backend.entity.Image;
import com.bidCircle.backend.entity.Item;
import com.bidCircle.backend.repository.ImageRepository;
import com.bidCircle.backend.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Blob;
import java.sql.SQLException;

@Service
public class FileServiceImpl implements FileService {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Override
    public Image saveImages(MultipartFile file, Item item) throws Exception {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            if(fileName.contains("..")) {
                throw  new Exception("Filename contains invalid path sequence "
                        + fileName);
            }

            Image attachment = new Image();
            attachment.setFileName(fileName);
            attachment.setFileType(file.getContentType());
//            attachment.setData(file.getBytes());
            Blob blob = new javax.sql.rowset.serial.SerialBlob(file.getBytes());
            attachment.setData(blob);
            attachment.setItem(item);
            Image img = imageRepository.save(attachment);
            item.addImage(img);
            itemRepository.save(item);
            return img;


        } catch (SQLException e) {
            throw new Exception("Could not save File: " + fileName);
        }
    }

}

