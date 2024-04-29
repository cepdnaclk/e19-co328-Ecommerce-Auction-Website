package com.bidCircle.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String title;
    @Lob
    private String description;
    private Date startDate;
    private Date endDate;
    private int startPrice;
    private int incrementPrice;
    private boolean isClosed=false;

    @OneToMany(mappedBy = "item")
    private List<Image> images = new ArrayList<>();

    @ManyToOne()
    @JoinColumn(
            name = "auctioneer_uname",
            referencedColumnName = "userName"
    )@JsonIgnore
    private Auctioneer auctioneer;

    @ManyToOne()
    @JoinColumn(
            name = "c_name",
            referencedColumnName = "name"
    )@JsonIgnore
    private Category category;


    public void addImage(Image image){
        this.images.add(image);
    }


}
