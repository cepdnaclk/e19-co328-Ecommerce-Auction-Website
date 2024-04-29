package com.bidCircle.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
public class Auctioneer {
    @Id
    private String userName;
    private String companyName;

    @OneToMany(mappedBy = "auctioneer")
    private List<Item> items = new ArrayList<>();
}
