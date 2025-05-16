"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EstatisticasBasquete from "@/components/EstatisticasBasquete";

export default function Home() {
  return <EstatisticasBasquete />;
}

export default function EstatisticasBasquete() {
  const [jogadores, setJogadores] = useState([
    { id: 1, nome: "Lucas Silva", pontos: 18, rebotes: 7, assistencias: 5, jogos: 3 },
    { id: 2, nome: "Marcos Lima", pontos: 26, rebotes: 10, assistencias: 3, jogos: 4 },
    { id: 3, nome: "Carlos Souza", pontos: 10, rebotes: 5, assistencias: 8, jogos: 2 },
  ]);

  const [form, setForm] = useState({ nome: "", pontos: "", rebotes: "", assistencias: "", jogos: "" });
  const [editandoId, setEditandoId] = useState(null);
  const [formEdicao, setFormEdicao] = useState({ nome: "", pontos: "", rebotes: "", assistencias: "", jogos: "" });

  const calcularMedia = (total, jogos) => (jogos ? (total / jogos).toFixed(1) : "0.0");

  const adicionarJogador = () => {
    const novoJogador = {
      id: jogadores.length + 1,
      nome: form.nome,
      pontos: parseInt(form.pontos),
      rebotes: parseInt(form.rebotes),
      assistencias: parseInt(form.assistencias),
      jogos: parseInt(form.jogos),
    };
    setJogadores([...jogadores, novoJogador]);
    setForm({ nome: "", pontos: "", rebotes: "", assistencias: "", jogos: "" });
  };

  const iniciarEdicao = (jogador) => {
    setEditandoId(jogador.id);
    setFormEdicao({
      nome: jogador.nome,
      pontos: jogador.pontos,
      rebotes: jogador.rebotes,
      assistencias: jogador.assistencias,
      jogos: jogador.jogos,
    });
  };

  const salvarEdicao = () => {
    setJogadores(
      jogadores.map((j) =>
        j.id === editandoId
          ? {
              ...j,
              nome: formEdicao.nome,
              pontos: parseInt(formEdicao.pontos),
              rebotes: parseInt(formEdicao.rebotes),
              assistencias: parseInt(formEdicao.assistencias),
              jogos: parseInt(formEdicao.jogos),
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

  const excluirJogador = (id) => {
    setJogadores(jogadores.filter((j) => j.id !== id));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Cadastrar novo jogador</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-2">
          <Input placeholder="Nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
          <Input placeholder="Pontos" value={form.pontos} onChange={(e) => setForm({ ...form, pontos: e.target.value })} />
          <Input placeholder="Rebotes" value={form.rebotes} onChange={(e) => setForm({ ...form, rebotes: e.target.value })} />
          <Input placeholder="Assistências" value={form.assistencias} onChange={(e) => setForm({ ...form, assistencias: e.target.value })} />
          <Input placeholder="Jogos" value={form.jogos} onChange={(e) => setForm({ ...form, jogos: e.target.value })} />
        </div>
        <Button onClick={adicionarJogador}>Adicionar jogador</Button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {jogadores.map((jogador) => (
          <Card key={jogador.id} className="shadow-lg rounded-2xl">
            <CardContent className="p-4">
              {editandoId === jogador.id ? (
                <div className="grid gap-2">
                  <Input value={formEdicao.nome} onChange={(e) => setFormEdicao({ ...formEdicao, nome: e.target.value })} />
                  <Input value={formEdicao.pontos} onChange={(e) => setFormEdicao({ ...formEdicao, pontos: e.target.value })} />
                  <Input value={formEdicao.rebotes} onChange={(e) => setFormEdicao({ ...formEdicao, rebotes: e.target.value })} />
                  <Input value={formEdicao.assistencias} onChange={(e) => setFormEdicao({ ...formEdicao, assistencias: e.target.value })} />
                  <Input value={formEdicao.jogos} onChange={(e) => setFormEdicao({ ...formEdicao, jogos: e.target.value })} />
                  <div className="flex gap-2 mt-2">
                    <Button onClick={salvarEdicao}>Salvar</Button>
                    <Button variant="outline" onClick={cancelarEdicao}>Cancelar</Button>
                    <Button variant="destructive" onClick={() => excluirJogador(jogador.id)}>Excluir</Button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-2">{jogador.nome}</h2>
                  <p>Jogos: {jogador.jogos}</p>
                  <p>Pontos totais: {jogador.pontos}</p>
                  <p>Rebotes: {jogador.rebotes}</p>
                  <p>Assistências: {jogador.assistencias}</p>
                  <div className="mt-2 border-t pt-2 text-sm text-gray-600">
                    <p>Média de pontos: {calcularMedia(jogador.pontos, jogador.jogos)}</p>
                    <p>Média de rebotes: {calcularMedia(jogador.rebotes, jogador.jogos)}</p>
                    <p>Média de assistências: {calcularMedia(jogador.assistencias, jogador.jogos)}</p>
                  </div>
                  <Button className="mt-2" onClick={() => iniciarEdicao(jogador)}>Editar</Button>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
