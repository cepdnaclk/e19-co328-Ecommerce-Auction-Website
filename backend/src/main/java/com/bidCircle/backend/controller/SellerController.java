package com.bidCircle.backend.controller;

import com.bidCircle.backend.entity.Image;
import com.bidCircle.backend.entity.Item;
import com.bidCircle.backend.model.FileDataModel;
import com.bidCircle.backend.model.ItemModel;
import com.bidCircle.backend.model.ItemResponseModel;
import com.bidCircle.backend.repository.AuctioneerRepository;
import com.bidCircle.backend.service.FileService;
import com.bidCircle.backend.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/seller")
public class SellerController {

    @Autowired
    private FileService imageService;

    @Autowired
    private AuctioneerRepository auctioneerRepository;

    @Autowired
    private SellerService sellerService;



    @PostMapping("/addItem")
    @PreAuthorize("hasAuthority('ROLE_SELLER')")
    public List<FileDataModel> uploadFiles(@RequestParam("file") MultipartFile[] files,
//                                           @RequestBody ItemModel itemModel
               @RequestParam("userName") String userName, @RequestParam("title") String title,
                @RequestParam("description") String description, @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate, @RequestParam("startPrice") String startPrice,
            @RequestParam("incrementPrice") String incrementPrice, @RequestParam("category") String category

//                                           @RequestParam("data") ItemModel itemModel
    ) throws Exception {
        List<FileDataModel> responseDataList = new ArrayList<>();
        ItemModel itemModel = new ItemModel();
        itemModel.setUserName(userName);
        itemModel.setTitle(title);
        itemModel.setDescription(description);
        itemModel.setStartDate(startDate);
        itemModel.setEndDate(endDate);
        itemModel.setStartPrice(startPrice);
        itemModel.setIncrementPrice(incrementPrice);
        itemModel.setCategory(category);
        long id = sellerService.addItem(itemModel);


        for (MultipartFile file : files) {
            Item item = sellerService.findItemById(id);
            Image attachment = imageService.saveImages(file, item);
            // Assuming this line is supposed to save the image to the database.
            item.addImage(attachment);
            String downloadUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/download/")
                    .path(attachment.getId())
                    .toUriString();

            FileDataModel fileDataModel = new FileDataModel(attachment.getFileName(),
                    downloadUrl,
                    file.getContentType(),
                    file.getSize());

            responseDataList.add(fileDataModel);
        }



        return responseDataList;
    }

    @GetMapping("/item")
    public ResponseEntity<ItemResponseModel> displayImage(@RequestParam("id") long id) throws Exception {
        Optional<Item> item = sellerService.getItemById(id);
        Item itemEntity = item.orElseThrow(() -> new Exception("Item not found for id: " + id));

        List<byte[]> imageByteArray = new ArrayList<>();

        for(Image data: itemEntity.getImages()){
            byte [] imageBytes = null;
            imageBytes = data.getData().getBytes(1,(int) data.getData().length());
            imageByteArray.add(imageBytes);

        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
        ItemResponseModel itemResponseModel = new ItemResponseModel();
        itemResponseModel.setData(imageByteArray);
        itemResponseModel.setDescription(itemEntity.getDescription());
        itemResponseModel.setCategory(itemEntity.getCategory().getName());
        itemResponseModel.setEndDate(sdf.format(itemEntity.getEndDate()));
        itemResponseModel.setStartDate(sdf.format(itemEntity.getStartDate()));
        itemResponseModel.setTitle(itemEntity.getTitle());
        itemResponseModel.setStartPrice(String.valueOf(itemEntity.getStartPrice()));
        itemResponseModel.setIncrementPrice(String.valueOf(itemEntity.getIncrementPrice()));
        itemResponseModel.setName(itemEntity.getAuctioneer().getCompanyName());


        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(itemResponseModel);
    }

//    @PostMapping("/upload")
//    public FileDataModel uploadFile(@RequestParam("file")MultipartFile file) throws Exception {
//        Image attachment = null;
//        String downloadURl = "";
//        attachment = imageService.saveImages(file);
//        downloadURl = ServletUriComponentsBuilder.fromCurrentContextPath()
//                .path("/download/")
//                .path(attachment.getId())
//                .toUriString();
//
//        FileDataModel fileDataModel = new FileDataModel();
//        fileDataModel.setFileName(attachment.getFileName());
//        fileDataModel.setFileSize(file.getSize());
//        fileDataModel.setFileType(file.getContentType());
//        fileDataModel.setDownloadURL(downloadURl);
//        return fileDataModel;
//    }

    @GetMapping("/hi")
    @PreAuthorize("hasAuthority('ROLE_SELLER')")
    @CrossOrigin(
            origins = "http://localhost:5173",
            allowedHeaders = {"Authorization", "Content-Type"},
            exposedHeaders = {"Authorization"},
            allowCredentials = "true",
            methods = {RequestMethod.GET, RequestMethod.POST}
    )
    public String hello(){
        return "ff";
    }

    @GetMapping("/profile")
    public String getMethodName(@RequestParam String param) {
        return new String();
    }
    


}
