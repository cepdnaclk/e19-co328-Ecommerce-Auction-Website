package com.bidCircle.backend.service;

import com.bidCircle.backend.entity.Image;
import com.bidCircle.backend.entity.Item;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {


    Image saveImages(MultipartFile file, Item item) throws Exception;
}
