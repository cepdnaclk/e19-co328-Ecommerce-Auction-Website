package com.bidCircle.backend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Bider {
    @Id
    private String userName;
    private String address1;
    private String address2;
    private String address3;
    private String province;
    private String postalCode;
    private String contactNo;

    @ManyToMany()
    @JoinColumn(
            name = "fk_item",
            referencedColumnName = "id"
    )
    private List<Item> watchlist = new ArrayList<>();

    public void addToWatchList(Item item){
        this.watchlist.add(item);
    }
}
