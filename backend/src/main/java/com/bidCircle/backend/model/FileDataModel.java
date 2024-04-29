package com.bidCircle.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileDataModel {
    private String fileName;
    private String downloadURL;
    private String fileType;
    private long fileSize;
}
