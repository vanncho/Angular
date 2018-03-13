package com.main.gamestore.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import com.main.gamestore.models.Game;

@RestController
@RequestMapping("/api")
public class TestRestController {

	@GetMapping("/")
	public @ResponseBody String getJSON() {

		Game game = new Game();
		game.setTitle("title");
		game.setDescription("description");
		game.setPrice(28.0D);
		game.setSize(15D);
		
//		GsonBuilder builder = new GsonBuilder();
		Gson gson = new Gson();
		String j = gson.toJson(game);
		
		System.out.println(j);
		return j;
	}
}
