"use client";
import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function EstatisticasBasquete() {
  const [jogadores, setJogadores] = useState([
    { id: 1, nome: "Lucas Silva", pontos: 18, rebotes: 7, assistencias: 5, jogos: 3 },
    { id: 2, nome: "Marcos Lima", pontos: 26, rebotes: 10, assistencias: 3, jogos: 4 },
    { id: 3, nome: "Carlos Souza", pontos: 10, rebotes: 5, assistencias: 8, jogos: 2 },
  ]);

  const [form, setForm] = useState({ nome: "", pontos: "", rebotes: "", assistencias: "", jogos: "" });
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [formEdicao, setFormEdicao] = useState({ nome: "", pontos: "", rebotes: "", assistencias: "", jogos: "" });

  const calcularMedia = (total: number, jogos: number): string => 
    jogos ? (total / jogos).toFixed(1) : "0.0";

  const adicionarJogador = () => {
    const novoJogador = {
      id: jogadores.length + 1,
      nome: form.nome,
      pontos: Number(form.pontos),
      rebotes: Number(form.rebotes),
      assistencias: Number(form.assistencias),
      jogos: Number(form.jogos),
    };
    setJogadores([...jogadores, novoJogador]);
    setForm({ nome: "", pontos: "", rebotes: "", assistencias: "", jogos: "" });
  };

  const iniciarEdicao = (jogador: typeof jogadores[0]) => {
    setEditandoId(jogador.id);
    setFormEdicao({
      nome: jogador.nome,
      pontos: jogador.pontos.toString(),
      rebotes: jogador.rebotes.toString(),
      assistencias: jogador.assistencias.toString(),
      jogos: jogador.jogos.toString(),
    });
  };

  const salvarEdicao = () => {
    setJogadores(
      jogadores.map((j) =>
        j.id === editandoId
          ? {
              ...j,
              nome: formEdicao.nome,
              pontos: Number(formEdicao.pontos),
              rebotes: Number(formEdicao.rebotes),
              assistencias: Number(formEdicao.assistencias),
              jogos: Number(formEdicao.jogos),
            }
          : j
      )
    );
    setEditandoId(null);
    setFormEdicao({ nome: "", pontos: "", rebotes: "", assistencias: "", jogos: "" });
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setFormEdicao({ nome: "", pontos: "", rebotes: "", assistencias: "", jogos: "" });
  };

  const excluirJogador = (id: number) => {
    setJogadores(jogadores.filter((j) => j.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Cadastrar novo jogador</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Input
          placeholder="Nome"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          className="border rounded p-2"
        />
        <Input
          placeholder="Pontos"
          value={form.pontos}
          onChange={(e) => setForm({ ...form, pontos: e.target.value })}
          className="border rounded p-2"
          type="number"
        />
        <Input
          placeholder="Rebotes"
          value={form.rebotes}
          onChange={(e) => setForm({ ...form, rebotes: e.target.value })}
          className="border rounded p-2"
          type="number"
        />
        <Input
          placeholder="Assistências"
          value={form.assistencias}
          onChange={(e) => setForm({ ...form, assistencias: e.target.value })}
          className="border rounded p-2"
          type="number"
        />
        <Input
          placeholder="Jogos"
          value={form.jogos}
          onChange={(e) => setForm({ ...form, jogos: e.target.value })}
          className="border rounded p-2"
          type="number"
        />
      </div>
      <Button className="mb-8" onClick={adicionarJogador}>
        Adicionar jogador
      </Button>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jogadores.map((jogador) => (
          <Card key={jogador.id} className="shadow-lg rounded-xl">
            <CardContent className="p-4">
              {editandoId === jogador.id ? (
                <div className="space-y-3">
                  <Input
                    value={formEdicao.nome}
                    onChange={(e) => setFormEdicao({ ...formEdicao, nome: e.target.value })}
                    className="border rounded p-2"
                  />
                  <Input
                    value={formEdicao.pontos}
                    onChange={(e) => setFormEdicao({ ...formEdicao, pontos: e.target.value })}
                    className="border rounded p-2"
                    type="number"
                  />
                  <Input
                    value={formEdicao.rebotes}
                    onChange={(e) => setFormEdicao({ ...formEdicao, rebotes: e.target.value })}
                    className="border rounded p-2"
                    type="number"
                  />
                  <Input
                    value={formEdicao.assistencias}
                    onChange={(e) => setFormEdicao({ ...formEdicao, assistencias: e.target.value })}
                    className="border rounded p-2"
                    type="number"
                  />
                  <Input
                    value={formEdicao.jogos}
                    onChange={(e) => setFormEdicao({ ...formEdicao, jogos: e.target.value })}
                    className="border rounded p-2"
                    type="number"
                  />
                  <div className="flex gap-3 mt-4">
                    <Button onClick={salvarEdicao}>Salvar</Button>
                    <Button variant="outline" onClick={cancelarEdicao}>
                      Cancelar
                    </Button>
                    <Button variant="destructive" onClick={() => excluirJogador(jogador.id)}>
                      Excluir
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-3">{jogador.nome}</h2>
                  <p>Jogos: {jogador.jogos}</p>
                  <p>Pontos totais: {jogador.pontos}</p>
                  <p>Rebotes: {jogador.rebotes}</p>
                  <p>Assistências: {jogador.assistencias}</p>
                  <div className="mt-3 border-t pt-2 text-sm text-gray-600 space-y-1">
                    <p>Média de pontos: {calcularMedia(jogador.pontos, jogador.jogos)}</p>
                    <p>Média de rebotes: {calcularMedia(jogador.rebotes, jogador.jogos)}</p>
                    <p>Média de assistências: {calcularMedia(jogador.assistencias, jogador.jogos)}</p>
                  </div>
                  <Button className="mt-4" onClick={() => iniciarEdicao(jogador)}>
                    Editar
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
