package com.bidCircle.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Category {
    @Id
    private String name;

    @OneToMany(mappedBy = "category")
    private List<Item> items = new ArrayList<>();

    public void addItems(Item item){this.items.add(item);}
}
