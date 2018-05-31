package com.gamestore.controllers;

import com.gamestore.models.Card.AddCardModel;
import com.gamestore.models.Game.view.GameListModel;
import com.gamestore.services.interfaces.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/userCart/{id}")
    public ResponseEntity<List<GameListModel>> getAllGamesInCart(@PathVariable(name = "id") Long userId) {

        List<GameListModel> games = cartService.getCartForUser(userId);

        return new ResponseEntity<>(games, HttpStatus.OK);
    }

    @PostMapping("/addToCart")
    public ResponseEntity addToUserCart(@RequestBody AddCardModel cardModel){

        boolean isAdded = cartService.addToUserCart(cardModel);

        if (isAdded) {
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/removeFromCart")
    public ResponseEntity<List<GameListModel>> removeGameFromCart(@RequestBody AddCardModel cardModel){

        List<GameListModel> games = cartService.removeGameFromCart(cardModel);

        return new ResponseEntity<>(games, HttpStatus.OK);
    }

    @PostMapping("/order/{userId}")
    public ResponseEntity emptyCart(@PathVariable(name = "userId") Long userId, @RequestBody List<Long> gamesInCart) {

        cartService.makeOrder(userId, gamesInCart);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
