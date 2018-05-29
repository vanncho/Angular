package com.gamestore.controllers.Cart;

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

    @GetMapping("/usercart/{id}")
    public ResponseEntity<List<GameListModel>> getAllGamesInCart(@PathVariable(name = "id") Long userId) {

        List<GameListModel> games = cartService.getCartForUser(userId);

        return new ResponseEntity<>(games, HttpStatus.OK);
    }

    @PostMapping("/addcart")
    public ResponseEntity registerUser(@RequestBody AddCardModel cardModel){

        System.err.println(cardModel.getGameId());
        System.err.println(cardModel.getUserId());

        return new ResponseEntity<>(HttpStatus.OK);

    }
}
